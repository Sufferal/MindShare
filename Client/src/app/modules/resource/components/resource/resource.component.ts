import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
})
export class ResourceComponent implements OnInit {
  resources = [
    {
      "title": "Motivation",
      "description": `Motivation serves as the driving force that propels individuals toward
          achieving their goals and aspirations. It acts as the spark that
          ignites the flame within, propelling individuals to overcome
          challenges, pursue excellence, and persevere in the face of adversity.
          This article explores the multifaceted nature of motivation, delving
          into its psychological underpinnings, the role it plays in personal
          and professional realms, and strategies to cultivate and sustain it.`,
      "image": "assets/img/resources/motivation.png"
    },
    {
      "title": "Discipline",
      "description": `Discipline, often regarded as the silent architect of success, is the
          unwavering commitment to a set of principles and actions that lead to
          self-improvement and achievement. It serves as the backbone of
          personal development, fostering resilience, focus, and the ability to
          overcome obstacles. This article explores the multifaceted nature of
          discipline, delving into its significance in various aspects of life,
          strategies for cultivating it, and the transformative impact it can
          have on individuals.`,
      "image": "assets/img/resources/discipline.png"
    },
    {
      "title": "Emotions",
      "description": `Emotions, the intricate threads woven into the fabric of human
          experience, serve as powerful guides that shape our perceptions,
          decisions, and interactions. This article delves into the intricate
          landscape of emotions, exploring their diverse nature, the importance
          of emotional intelligence, and the ways in which understanding and
          managing emotions can enrich personal and interpersonal dynamics.`,
      "image": "assets/img/resources/emotions.png"
    },
  ];
  myControl = new FormControl('');
  options: string[] = ['Motivation', 'Discipline', 'Emotions'];
  filteredOptions: Observable<string[]> = new Observable<string[]>(); 
 
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
