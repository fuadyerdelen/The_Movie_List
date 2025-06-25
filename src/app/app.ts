import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';





@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App implements OnInit, OnDestroy {


  isModalOpen = false;
  isLoadingModal = false;
  private movieSelectionSub!: Subscription;


  ngOnInit(): void {

  }


  ngOnDestroy() {
    if (this.movieSelectionSub) {
      this.movieSelectionSub.unsubscribe();
    }
  }





  public getYear(): number {
    return new Date().getFullYear();
  }
}