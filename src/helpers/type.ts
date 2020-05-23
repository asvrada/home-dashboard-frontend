enum EnumType {
    Card = "Card",
    Company = "Company",
    Category = "Category",
}

interface IIcon {
    keyword: string,
    path: string
}

interface IEnumCategory {
    category: EnumType,
    name: string,
    icon?: IIcon
}

interface ITransaction {
    amount: number,

    category?: IEnumCategory,
    card?: IEnumCategory,
    company?: IEnumCategory,

    note: string,
    timeCreated: string
}

const DEFAULT_TRANSACTION: ITransaction = {
    amount: 0,
    note: '',
    timeCreated: ''
};

export {DEFAULT_TRANSACTION};

export type {EnumType, IIcon, IEnumCategory, ITransaction};