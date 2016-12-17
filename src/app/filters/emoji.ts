/// <reference path="../../../typings/index.d.ts" />
declare var emojione: any;
export const emojiFilter = () => {
  return (input) => {
    return emojione.toImage(input || '');
  };
};

export const emojiDirective = [() => {
  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      var html = element.html();
      if (html) {
        element.html(emojione.toImage(html));
      } else {
        scope.$watch(() => {
          return attrs.emojione;
        }, (value) => {
          element.html(value && emojione.toImage(value.toString()));
        });
      }
    }
  };
}];
