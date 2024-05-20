<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBarangRequest;
use App\Http\Requests\StoreBarangTempRequest;
use App\Models\MCustomer;
use App\Models\TSales;
use App\Http\Requests\StoreTransaksiRequest;
use App\Models\MBarang;
use App\Models\TSalesDet;
use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = DB::table('t_sales')
            ->join('m_customer', 't_sales.cust_id', '=', 'm_customer.id')
            ->leftJoin('t_sales_det', 't_sales.id', '=', 't_sales_det.sales_id')
            ->select(
                't_sales.id',
                't_sales.kode',
                't_sales.tgl',
                't_sales.subtotal',
                't_sales.diskon',
                't_sales.ongkir',
                't_sales.total_bayar',
                'm_customer.nama as nama_kustomer',
                DB::raw('COUNT(t_sales_det.id) as jumlah_barang')
            )
            ->when($request->search, function (Builder $query, $search) {
                $query->whereRaw('LOWER(t_sales.kode) LIKE LOWER(?)', ["%$search%"])
                    ->orWhereRaw('LOWER(m_customer.nama) LIKE LOWER(?)', ["%$search%"]);
            })
            ->groupBy(
                't_sales.id',
                't_sales.kode',
                't_sales.tgl',
                't_sales.subtotal',
                't_sales.diskon',
                't_sales.ongkir',
                't_sales.total_bayar',
                'nama_kustomer'
            )
            ->orderBy('t_sales.id')
            ->get();

        // return dd($query, $query->toRawSql(), $query->get());

        return Inertia::render('Transaction/Index', [
            'data' => fn () => $query,
            'search' => $request->search ?? '',
        ]);
    }

    public function create(Request $request)
    {
        $countTSales = DB::table('t_sales')
            ->whereMonth('tgl', Carbon::now()->format('m'))
            ->whereYear('tgl', Carbon::now()->format('Y'))
            ->count();

        $noTransaksi = Carbon::now()->format('Ym') . '-' . str_pad($countTSales + 1, 4, '0', STR_PAD_LEFT);

        $customers = MCustomer::all();
        $items = MBarang::all();
        $itemsTemp = $request->session()->get('itemsTemp', []);

        return Inertia::render('Transaction/Create', [
            'noTransaksi' => fn () => $noTransaksi,
            'customers' => fn () => $customers,
            'items' => fn () => $items,
            'itemsTemp' => fn () => $itemsTemp,
        ]);
    }

    public function store(StoreTransaksiRequest $request)
    {
        $data = $request->validated();

        $sales = TSales::create([
            "cust_id" => $data['idKustomer'],
            "kode" => $data['noTransaksi'],
            "tgl" => $data['tglTransaksi'],
            "subtotal" => (float) $data['subtotal'],
            "diskon" => (float) $data['diskon'],
            "ongkir" => (float) $data['ongkir'],
            "total_bayar" => (float) $data['totalBayar'],
        ]);

        $itemsTemp = $data['items'];

        foreach ($itemsTemp as $item) {
            TSalesDet::create([
                'sales_id' => $sales->id,
                'barang_id' => $item['idBarang'],
                'harga_bandrol' => $item['harga'],
                'qty' => $item['jumlah'],
                'diskon_pct' => $item['diskonPct'],
                'diskon_nilai' => $item['diskonNilai'],
                'harga_diskon' => $item['hargaDiskon'],
                'total' => $item['total'],
            ]);
        }

        $request->session()->forget('itemsTemp');

        return redirect()->route('transaction.index');
    }

    public function storeTmpItem(StoreBarangTempRequest $request)
    {
        $data = $request->validated();

        $randId = Carbon::now()->timestamp;
        $barang = MBarang::find($data['idBarang']);

        $diskonPct = $data['diskon'] ?? 0;
        $diskonNilai = (float) $barang->harga * $diskonPct / 100;
        $hargaDisc = (float) $barang->harga - $diskonNilai;
        $total = (float) $hargaDisc * $data['jumlah'];

        // $request->session()->forget('itemsTemp');
        $sessionItemsTemp = $request->session()->get('itemsTemp', []);
        $request->session()->put('itemsTemp', array_merge($sessionItemsTemp, [
            [
                'id' => $randId,
                'idBarang' => $data['idBarang'],
                'kodeBarang' => $barang->kode,
                'namaBarang' => $barang->nama,
                'jumlah' => $data['jumlah'],
                'harga' => $barang->harga,
                'diskonPct' => $diskonPct,
                'diskonNilai' => $diskonNilai,
                'hargaDiskon' => $hargaDisc,
                'total' => $total,
            ]
        ]));

        return;
    }

    public function editByIdTmpItem(StoreBarangTempRequest $request, int $id)
    {
        $data = $request->validated();
        $itemsTemp = session('itemsTemp', []);

        foreach ($itemsTemp as $key => $item) {
            if ($item['id'] === $id) {
                $barang = MBarang::find($data['idBarang']);

                $diskonPct = $data['diskon'];
                $diskonNilai = (float) $barang->harga * $diskonPct / 100;
                $hargaDisc = (float) $barang->harga - $diskonNilai;
                $total = (float) $hargaDisc * $data['jumlah'];

                $itemsTemp[$key]['idBarang'] = $data['idBarang'];
                $itemsTemp[$key]['kodeBarang'] = $barang->kode;
                $itemsTemp[$key]['namaBarang'] = $barang->nama;
                $itemsTemp[$key]['jumlah'] = $data['jumlah'];
                $itemsTemp[$key]['harga'] = $barang->harga;
                $itemsTemp[$key]['diskonPct'] = $diskonPct;
                $itemsTemp[$key]['diskonNilai'] = $diskonNilai;
                $itemsTemp[$key]['hargaDiskon'] = $hargaDisc;
                $itemsTemp[$key]['total'] = $total;
            }
        }

        // return dd($id, $data['idBarang'], $data['diskon'], $data['jumlah'], $itemsTemp);
        session(['itemsTemp' => $itemsTemp]);
        return;
    }

    public function deleteAllTmpItem(Request $request, Response $response)
    {
        $request->session()->forget('itemsTemp');
        return;
    }

    public function deleteByIdTmpItem(int $id)
    {
        $itemsTemp = session('itemsTemp', []);

        $index = array_search($id, array_column($itemsTemp, 'id'));

        array_splice($itemsTemp, $index, 1);

        // return dd($index, $id, $itemsTemp, $filteredItem);

        session(['itemsTemp' => $itemsTemp]);

        return to_route('transaction.create');
    }
}
