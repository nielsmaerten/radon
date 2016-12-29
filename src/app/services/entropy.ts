/// <reference path="../../../typings/index.d.ts" />

import * as Q from 'q';
import * as moreEntropy from 'more-entropy';

export class EntropyService {


  /** @ngInject */
  constructor() {
    //
  }

  public generateSalt(): Q.Promise<string> {
    let generator = new moreEntropy.Generator();
    let deferred = Q.defer<string>();
    generator.generate(100, (values: number[]) => {
      let salt = '';
      values.forEach(val => salt += val);
      deferred.resolve(salt);
    });
    return deferred.promise;
  }
};
