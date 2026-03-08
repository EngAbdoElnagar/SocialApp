export interface IPost {
  _id:           string;
  body:          string;
  image:         string;
  privacy:       string;
  user:          User;
  sharedPost:    null;
  likes:         string[];
  createdAt:     Date;
  commentsCount: number;
  topComment:    TopComment;
  sharesCount:   number;
  likesCount:    number;
  isShare:       boolean;
  id:            string;
  bookmarked:    boolean;
}

export interface TopComment {
  _id:            string;
  content:        string;
  commentCreator: User;
  post:           string;
  parentComment:  null;
  likes:          any[];
  createdAt:      Date;
}

export interface User {
  _id:       string;
  name:      string;
  photo:     string;
  username?: string;
}
