export interface State {
  name:
    | 'articleDetails'
    | 'selectedArticle'
    | 'neutral'
    | 'addArticle'
    | 'submittingArticle'
    | 'submitAttempted'
    | 'addArticleLocation'
    | 'search';
  data?: any;
}
