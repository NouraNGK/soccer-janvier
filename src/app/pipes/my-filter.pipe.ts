import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(matchesTab: any, term: string) {
    if (term === undefined) {
      // "undefined": signifie lorsque l'utilisateur n'a rien écrit dans l'input
      return matchesTab;
      // "else" n'est pas utilisé dans ce cas car, return est bloquante
    }

    return matchesTab.filter((obj) => {
      return (obj.teamOne.toLowerCase().includes(term.toLowerCase())
        || obj.teamTwo.toLowerCase().includes(term.toLowerCase()));
        // includes c'est à dire "fi westou walla aandou el term fourni par l'utilisateur"
    })
    
    // explication juste pour moi pour le bout de code juste au dessus:
    // let v = Tab.filter((obj) => {
    //   return (obj.teamOne.toLowerCase().includes(term.toLowerCase())
    //     || obj.teamTwo.toLowerCase().includes(term.toLowerCase()));
    //     // includes c'est à dire "fi westou walla aandou el term fourni par l'utilisateur"
    // })
    // return v;
  }
}
