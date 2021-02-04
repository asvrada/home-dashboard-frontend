type ReturnTypeGetURLTo = (props: string[]) => string;

enum EnumPage {
  Index,
  AllEntry,
  AllReEntry,
  Entry,
  EntryEdit,
  EntryNew,
  AllEnum,
  EnumNew,
  Enum,
  Login,
  Profile,
  ReEntry,
  ReEntryEdit,
  ReEntryNew,
  Setting,
  Welcome
}

function routeURL(page: EnumPage): string {
  const map: {
    [key in EnumPage]: string
  } = {
    [EnumPage.Index]: '/',
    [EnumPage.AllEntry]: '/all-entry/',
    [EnumPage.AllReEntry]: '/all-re-entry/',
    [EnumPage.Entry]: '/entry/:id/',
    [EnumPage.EntryEdit]: '/entry/:id/edit/',
    [EnumPage.EntryNew]: '/entry/new/',
    [EnumPage.AllEnum]: '/all-enum/',
    [EnumPage.EnumNew]: '/enum/new/',
    [EnumPage.Enum]: '/enum/:id/',
    [EnumPage.Login]: '/login/',
    [EnumPage.Profile]: '/profile/',
    [EnumPage.ReEntry]: '/re-entry/:id/',
    [EnumPage.ReEntryEdit]: '/re-entry/:id/edit/',
    [EnumPage.ReEntryNew]: '/re-entry/new/',
    [EnumPage.Setting]: '/setting/',
    [EnumPage.Welcome]: '/welcome/'
  };

  return map[page];
}

function makeURL(page: EnumPage, props?: string[]) {
  const map: {
    [key in EnumPage]: ReturnTypeGetURLTo
  } = {
    [EnumPage.Index]: () => '/',
    [EnumPage.AllEntry]: () => '/all-entry/',
    [EnumPage.AllReEntry]: () => '/all-re-entry/',
    [EnumPage.Entry]: (props) => `/entry/${props[0]}/`,
    [EnumPage.EntryEdit]: (props) => `/entry/${props[0]}/edit/`,
    [EnumPage.EntryNew]: () => '/entry/new/',
    [EnumPage.AllEnum]: () => '/all-enum/',
    [EnumPage.EnumNew]: () => '/enum/new/',
    [EnumPage.Enum]: (props) => `/enum/${props[0]}/`,
    [EnumPage.Login]: () => '/login/',
    [EnumPage.Profile]: () => '/profile/',
    [EnumPage.ReEntry]: (props) => `/re-entry/${props[0]}`,
    [EnumPage.ReEntryEdit]: (props) => `/re-entry/${props[0]}/edit/`,
    [EnumPage.ReEntryNew]: () => '/re-entry/new/',
    [EnumPage.Setting]: () => '/setting/',
    [EnumPage.Welcome]: () => '/welcome/'
  };

  return map[page](props ?? []);
}

export { routeURL, makeURL, EnumPage };
export type { ReturnTypeGetURLTo };
