import { Store } from '../../types/index';

export const getFilteredStore = (storeData: Store[], keyword: string): Store[] => {
    return storeData.filter((store) => {
        // 1. キーワードが空の場合は全ての店舗を返す
        if (!keyword) return true;

        // 2. Storeインターフェースのプロパティに合わせて抽出
        // shopName や description が確実に文字列として存在するか確認しながら includes を実行
        const isNameMatch = store.shopName?.toLowerCase().includes(keyword.toLowerCase()) ?? false;
        const isDescriptionMatch = store.description?.includes(keyword) ?? false;

        // 3. いずれかにキーワードが含まれていればその Store を配列に残す
        return isNameMatch || isDescriptionMatch;
    });
};