import {Category} from "../../category/model/Category";
import {Related} from "./Related";
import {Tag} from "./Tag";
/**
 * Created by varun on २२-०७-२०१७.
 */
export interface Post {
  id: string;
  title: string;
  article: string;
  titleClean: string;
  datePublished: Date;
  bannerImage: string;
  featured: boolean;
  enabled: boolean;
  commentsEnabled: boolean;
  views: string;
  categories: Category[];
  relatedPosts: Related[];
  tags: Tag[];

}
