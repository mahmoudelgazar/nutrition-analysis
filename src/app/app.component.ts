import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Config } from './shared/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nutrition-analysis';
  app_id = '0395674e';
  app_key = '08a4c9f9d10f962ec3bd3d2f993b0b6c';
  data: any;
  loaded: boolean = false;
  dataList: Array<any> = [];
  datasplitLine: Array<any> = [];
  foodData: Array<any> = [];
  textareaParsed: any;
  AnalyzedData = {
    calories: 0,
    fat: 0,
    totalFat: 0,
    saturatedFat: 0,
    totalNutrientsFASAT: 0,
    totalDailyFASAT: 0,
    totalNutrientsCHOLE: 0,
    totalDailyCHOLE: 0,
    totalNutrientsNA: 0,
    totalDailyNA: 0,
    totalNutrientFIBTG: 0,
    totalDailyFIBTG: 0,
    totalNutrientsCHOCDF: 0,
    totalDailyCHOCDF: 0,
    totalNutrientsSUGAR: 0,
    totalNutrientsPROCNT: 0,
    totalDailyPROCNT: 0,
    totalDailyVITD: 0,
    totalNutrientsCA: 0,
    totalDailyCA: 0,
    totalNutrientsFE: 0,
    totalDailyFE: 0,
    totalNutrientsK: 0,
    totalDailyK: 0,
  };
  constructor(private httpClient: HttpClient) {}
  ngOnInit() {}
  parseTextArea() {
    this.dataList = this.textareaParsed.split('\n');
  }
  sumTotal() {}
  getDetails() {
    this.loaded = true;
    console.log(this.dataList);
    this.foodData = [];
    this.datasplitLine = [];
    const headers = { 'content-type': 'application/json' };
    this.dataList.map((item) => {
      let food = item.split(' ');
      this.datasplitLine.push(food);

      let body = {
        ingr: [item],
      };
      this.httpClient
        .post<any>(
          Config.nutritionDetails +
            '?app_id=' +
            this.app_id +
            '&app_key=' +
            this.app_key,
          body,
          { headers: headers }
        )
        .subscribe(
          (res) => {
            this.data = res;
            this.loaded = false;
            this.foodData.push(this.data);
            console.log(this.data.calories);
            this.AnalyzedDataTotal();
          },
          (err) => {
            this.loaded = false;
            alert('Make sure the data is entered correctly');
            console.log('failed' + err);
          }
        );
    });
  }
  AnalyzedDataTotal() {
    this.AnalyzedData.calories += this.data.calories;
    this.AnalyzedData.fat += this.data.totalNutrients.FAT.quantity;

    this.AnalyzedData.totalFat += this.data.totalDaily.FAT.quantity;
    this.AnalyzedData.totalNutrientsFASAT +=
      this.data.totalNutrients.FASAT.quantity;
    this.AnalyzedData.totalDailyFASAT += this.data.totalDaily.FASAT.quantity;
    this.AnalyzedData.totalNutrientsCHOLE +=
      this.data.totalNutrients.CHOLE.quantity;
    this.AnalyzedData.totalDailyCHOLE += this.data.totalDaily.CHOLE.quantity;
    this.AnalyzedData.totalNutrientsNA += this.data.totalNutrients.NA.quantity;
    this.AnalyzedData.totalDailyNA += this.data.totalDaily.NA.quantity;
    this.AnalyzedData.totalNutrientFIBTG +=
      this.data.totalNutrients?.FIBTG == undefined
        ? 0
        : this.data.totalNutrients?.FIBTG.quantity;
    this.AnalyzedData.totalDailyFIBTG +=
      this.data.totalDaily?.FIBTG == undefined
        ? 0
        : this.data.totalDaily?.FIBTG.quantity;
    this.AnalyzedData.totalNutrientsCHOCDF +=
      this.data.totalNutrients.CHOCDF.quantity;
    this.AnalyzedData.totalDailyCHOCDF += this.data.totalDaily.CHOCDF.quantity;
    this.AnalyzedData.totalNutrientsSUGAR +=
      this.data.totalNutrients?.SUGAR == undefined
        ? 0
        : this.data.totalNutrients.SUGAR.quantity;

    this.AnalyzedData.totalNutrientsPROCNT +=
      this.data.totalNutrients?.PROCNT == undefined
        ? 0
        : this.data.totalNutrients?.PROCNT.quantity;
    this.AnalyzedData.totalDailyPROCNT +=
      this.data.totalDaily?.PROCNT == undefined
        ? 0
        : this.data.totalDaily?.PROCNT.quantity;
    this.AnalyzedData.totalDailyVITD +=
      this.data.totalDaily?.VITD == undefined
        ? 0
        : this.data.totalDaily?.VITD.quantity;

    this.AnalyzedData.totalNutrientsCA +=
      this.data.totalNutrients?.CA == undefined
        ? 0
        : this.data.totalNutrients?.CA.quantity;
    this.AnalyzedData.totalDailyCA +=
      this.data.totalDaily?.CA == undefined
        ? 0
        : this.data.totalDaily?.CA.quantity;

    this.AnalyzedData.totalNutrientsFE +=
      this.data.totalNutrients?.FE == undefined
        ? 0
        : this.data.totalNutrients?.FE.quantity;
    this.AnalyzedData.totalDailyFE +=
      this.data.totalDaily?.FE == undefined
        ? 0
        : this.data.totalDaily?.FE.quantity;

    this.AnalyzedData.totalNutrientsK +=
      this.data.totalNutrients?.K == undefined
        ? 0
        : this.data.totalNutrients?.K.quantity;
    this.AnalyzedData.totalDailyK +=
      this.data.totalDaily?.K == undefined
        ? 0
        : this.data.totalDaily?.K.quantity;
  }
}
