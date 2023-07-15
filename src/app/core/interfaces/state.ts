export interface State {
  name:
    | 'articleDetails'
    | 'selectedArticle'
    | 'neutral'
    | 'addArticle'
    | 'submittingArticle'
    | 'submitAttempted'
    | 'addArticleLocation';
  data?: any;
}
