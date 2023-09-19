export type StateName =
  | 'articleDetails'
  | 'selectedArticle'
  | 'neutral'
  | 'addArticle'
  | 'submittingArticle'
  | 'submitAttempted'
  | 'addArticleLocation'
  | 'search'
  | 'notifications';

export interface State {
  name: StateName;
  data?: any;
}
