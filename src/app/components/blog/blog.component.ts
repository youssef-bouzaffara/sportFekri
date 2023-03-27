import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogTable:any= [

    {img: "assets/images/img_1.jpg",
    title: "Romolu to stay at Real Nadrid?",
    date:"May 20, 2020",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem."},

    {img: "assets/images/img_2.jpg",
    title: "C.Ronaldo to stay at Saudi?",
    date:"January 20, 2023",
    description: "Lorem ipsum dolor sit amet, consecteturdfsdfldjfp isjqdfijsqoi sqd tempora dolorem."},

    {img: "assets/images/img_3.jpg",
    title: "L.Messi to stay at Paris?",
    date:"August 11, 2022",
    description: "Lorem ipsum bonjour bonjour bonjour adipisicing elit. Possimus deserunt saepe tempora dolorem."},

    {img: "assets/images/img_1.jpg",
    title: "Mbappé to stay at PSG?",
    date:"June 20, 2021",
    description: "bonsoir monsieur youssef sctetur adipisicing elit. Possimus deserunt saepe tempora dolorem."},
  ];

  constructor() { }

  ngOnInit() {
  }

}
