import { Component, OnInit } from '@angular/core';
import * as Survey from "survey-angular";
import "survey-angular/survey.css";
Survey
    .StylesManager
    .applyTheme("modern");
Survey.StylesManager.applyTheme("bootstrap");

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  jsonToBind = {
    questions: [
      {
          type: "text",
          name: "name",
          title: "Your name:"
      }, {
          type: "text",
          name: "email",
          title: "Your e-mail"
      }, {
          type: "checkbox",
          name: "car",
          title: "What car are you driving?",
          isRequired: true,
          colCount: 2,
          choices: [
              "None",
              "Ford",
              "Vauxhall",
              "Volkswagen",
              "Nissan"
          ]
      }
  ]
  }
  surveyResultDisplay : boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.surveyBindCode();
  }

  surveyBindCode(){
    const survey = new Survey.Model(this.jsonToBind);
    Survey.SurveyNG.render('surveyElement', { model: survey });

        survey
            .onComplete
            .add(async (result) => {
              this.surveyResultDisplay = result ? true : false;
              var element = document.querySelector('#surveyResult');
              if(element){
                element.textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
              }
              // document.getElementById('#surveyResult') . textContent 
              console.log("Result of survey == ",JSON.stringify(result.data))
            })
  }
}
