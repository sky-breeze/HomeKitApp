import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news/news.service';
import { CommmonService } from 'src/app/services/shared/commmon.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.page.html',
  styleUrls: ['./news-feed.page.scss'],
})
export class NewsFeedPage implements OnInit {
  articles:any;

  constructor(
    private newsService : NewsService,
    private commonService : CommmonService
    ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.commonService.loadingPresent('loading...');
    this.newsService.getNews().subscribe((data)=>{
      this.commonService.loadingDismiss();
      console.log(data);
      this.articles = data['articles'];
    });
  }

}
