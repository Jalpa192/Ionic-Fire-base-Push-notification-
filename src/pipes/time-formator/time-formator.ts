import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormator',
})
export class TimeFormatorPipe implements PipeTransform {

  transform(value: string) {
    let a = value.split(":");
    let tp ="";
    let hour = parseInt(a[0])
    let min = parseInt(a[1])

    if(hour > 12 && hour <24){
      tp = this.pad(hour-12) +":" +this.pad(min) + "pm";
    }
    else{
      if(hour == 12 && min > 0){
        tp = hour +":" +this.pad(min) + "pm";
      }
      else{
        tp = this.pad(hour) +":" + this.pad(min) + "am";
      }
    }
    return tp;
  }

  pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }
}
