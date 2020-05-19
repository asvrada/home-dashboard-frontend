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
    icon: IIcon
}

interface ITransaction {
    amount: number,

    category: IEnumCategory,
    card: IEnumCategory,
    company: IEnumCategory,

    note: string,
    timeCreated: string
}

export type {EnumType, IIcon, IEnumCategory, ITransaction};