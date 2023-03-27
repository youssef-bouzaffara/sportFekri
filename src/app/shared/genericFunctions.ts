export function generateId(tab: any) {

    let max;

    if (tab.length == 0) {

      max = 0 ;

    } else {

      max = tab[0].id

      for (let i = 1; i < tab.length; i++) {

        if (tab[i].id > max) {

          max = tab[i].id;

        }

      }


    }

    return max + 1;

  }