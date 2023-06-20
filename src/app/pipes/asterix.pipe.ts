import { LowerCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asterix'
})
export class AsterixPipe implements PipeTransform {
  // ch: "abderrahmEn" => "*bd*rr*hm*n"
  // ch: "ali" => "*l*"
  transform(ch: string) {
    let result: string = "";
    let voyels = ["a", "e", "i", "o", "u", "y"];
    for (let i = 0; i < ch.length; i++) {
      let x = ch[i];
      for (let j = 0; j < voyels.length; j++) {
        if (ch[i].toLowerCase() == voyels[j]) {
          x = "*";
          break;
        }
      }
      result = result + x;
    }
    return result;
  }
  //   let result: string = "";
  //   let v: any ="";
  //   let voyels = ["a", "e", "i", "o", "u", "y"];
  //   for (let i = 0; i < ch.length; i++) {
  //     for (let j = 0; j < voyels.length; j++) {
  //       if (ch[i] == voyels[j]) {
  //         result = result + "*";
  //         v = voyels[j];
  //         break;
  //       }
  //     }
  //     if (ch[i] != v) {
  //       result = result + ch[i];
  //     }
  //   }
  //   return result;
  // }
}
