// 項目30  入力には寛容に、出力には厳格に

/** NG ver */
// type LngLat =
//     { lng: number; lat: number; } |
//     { lon: number; lat: number; } |
//     [number, number];


// interface CameraOptions {
//     center?: LngLat;
//     zoom?: number;
//     bearing?: number;
//     pitch?: number;
// }

// type LngLatBounds =
//     { northeast: LngLat, southwest: LngLat } |
//     [LngLat, LngLat] |
//     [number, number, number, number];

/**
 *  例）3次元地図のAPI
 * setCamera : カメラの位置を設定する関数
 * viewportForBounds : 与えられた境界矩形（LngLatBounds）に対応するビューポート（CameraOptions）を計算する関数
 *
 * この関数は、地図上の特定のエリア（境界矩形）を画面内に収めるためのカメラ設定を計算する
 * 例えば、ユーザーが地図上でエリアを選択した場合、そのエリアが画面内に収まるように
 * カメラの位置やズームレベルを調整するために使用
 *  */
// declare function setCamera(camera: CameraOptions): void;
// declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;


/** 改善ver */
// LngLat型を、 { lng: number; lat: number; } 型に限定し、オブジェクト形式や配列形式だったのを改善した
interface LngLat { lng: number; lat: number; };
// 柔軟な入力を許容するために、LngLatLike型を定義
type LngLatLike = LngLat | { lon: number; lat: number; } | [number, number];


// Cameraと、CameraOptionsを分離
// 出力専用の型（厳格な型定義）
interface Camera {
    center: LngLat;
    zoom: number;
    bearing: number;
    pitch: number;
}

// 入力専用の型（Partialで全てオプショナルにし、centerもオプショナルに、LngLatLikeという柔軟な型を使用）
interface CameraOptions extends Omit<Partial<Camera>, 'center'> {
    center?: LngLatLike;
}

type LngLatBounds =
    { northeast: LngLatLike, southwest: LngLatLike } |
    [LngLatLike, LngLatLike] |
    [number, number, number, number];

declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLatBounds): Camera;



function focusOnFeature(f: Feature) {
    const bounds = calculateBoundingBox(f); // ヘルパー関数
    const camera = viewportForBounds(bounds);
    setCamera(camera);
    const { center: { lat, lng }, zoom } = camera;
    // viewportForBoundsの戻り値の型が、オプショナルやユニオン型を多く含んでしまっており、扱いづらい
    // ~~~      Property 'lat' does not exist on type ...
    //          プロパティ 'lat' は型 ... に存在しません。
    //      ~~~ Property 'lng' does not exist on type ...
    //          プロパティ 'lng' は型 ... に存在しません。
    zoom;
    // ^? const zoom: number | undefined
    window.location.search = `?v=@${lat},${lng}z${zoom}`;
}
