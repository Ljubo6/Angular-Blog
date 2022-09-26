import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts:Post[] = []
  pSub!:Subscription
  searchStr!: ''
  dSub!: Subscription
  constructor(private postsService:PostsService) { }

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe({
      next:(posts) => {
        this.posts = posts
      }
    })
  }
  ngOnDestroy() {
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }


  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe({
      next: () =>{
        this.posts = this.posts.filter(post => post.id !== id)
      }
    })
  }
}
