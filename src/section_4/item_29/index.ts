// 項目29  有効な状態のみ表現する型を作る

/** 
* ## 覚えておくべきこと
* 有効な状態と不正な状態の両方を許容する型は、混乱を招き、エラーを起こしやすいコードの原因になる可能性が高い。
* 有効な状態のみ表現する型を作る。たとえ長くなっても、表現が難しくなっても、最終的には時間と労力を節約できる！
*/

// NGな例
interface State {
    pageText: string;
    isLoading: boolean;
    error?: string;
}

// 例）isLoadingと、errorの両方がセットされている状態の時、不正な状態になってしまう
function renderPage(state: State) {
    if (state.error) {
        return `Error! Unable to load ${currentPage}: ${state.error}`;
    } else if (state.isLoading) {
        return `Loading ${currentPage}...`;
    }
    return `<h1>${currentPage}</h1>\n${state.pageText}`;
}

// 例）
// エラーケースで、state.isLoadingをfalseにし忘れている
// state.errorをクリアしていない。ので、前回のリクエストが失敗している場合、新しいリクエストでエラーメッセージが表示されてしまう

async function changePage(state: State, newPage: string) {
    state.isLoading = true;
    try {
        const response = await fetch(getUrlForPage(newPage));
        if (!response.ok) {
            throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
        }
        const text = await response.text();
        state.isLoading = false;
        state.pageText = text;
    } catch (e) {
        state.error = '' + e;
    }
}

// OKな例
// ネットワークリクエストの状態を表現するために、状態を分割する
// 不正な状態を認めないようにする
interface RequestPending {
    state: 'pending';
}
interface RequestError {
    state: 'error';
    error: string;
}
interface RequestSuccess {
    state: 'ok';
    pageText: string;
}
type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
    currentPage: string;
    requests: { [page: string]: RequestState };
}

function renderPage2(state: State) {
    const { currentPage } = state;
    const requestState = state.requests[currentPage];
    switch (requestState.state) {
        //　不明な状態になることはない
        case 'pending':
            return `Loading ${currentPage}...`;
        case 'error':
            return `Error! Unable to load ${currentPage}: ${requestState.error}`;
        case 'ok':
            return `<h1>${currentPage}</h1>\n${requestState.pageText}`;
    }
}

async function changePage2(state: State, newPage: string) {
    state.requests[newPage] = { state: 'pending' };
    state.currentPage = newPage;
    try {
        const response = await fetch(getUrlForPage(newPage));
        if (!response.ok) {
            throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
        }
        const pageText = await response.text();
        state.requests[newPage] = { state: 'ok', pageText };
    } catch (e) {
        state.requests[newPage] = { state: 'error', error: '' + e };
    }
}
