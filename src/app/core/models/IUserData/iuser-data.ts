
export interface IUserData {
  _id:            string;
  name:           string;
  username:       string;
  email:          string;
  dateOfBirth:    Date;
  gender:         string;
  photo:          string;
  cover:          string;
  bookmarks:      string[];
  followers:      string[];
  following:      any[];
  createdAt:      Date;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id:             string;
}
