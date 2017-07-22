/**
 * Created by varun on २२-०७-२०१७.
 */
export interface Comment{
  id: string;
  postId: string;
  comment: string;
  markRead: boolean;
  enabled: boolean;
  createdDate: Date;

}
