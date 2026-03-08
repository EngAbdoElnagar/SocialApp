export interface IComments {
  _id:            string;
  content:        string;
  commentCreator: CommentCreator;
  post:           string;
  parentComment:  null;
  likes:          any[];
  createdAt:      Date;
  repliesCount: number;
  image: string;
}

export interface CommentCreator {
  _id:   string;
  name:  string;
  photo: string;
  username: string;

}
