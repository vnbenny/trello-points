var ICON = './images/logo.png';
var NO_POINTS = '0';


var cardBadge = function(t) {
  return t.get('card', 'shared', 'points').then(function(points) {
    if (points && points != NO_POINTS) {
      return [{
        dynamic: function() {
          return {
            text: points,
            icon: ICON
          }
        }
      }]
    } else {
      return [];
    }
  });
};

var cardButton = function(t, e) {
  return t.get('card', 'shared', 'points').then(function(points) {
    if (points && points != NO_POINTS) {
      var text = points + " points";
    } else {
      var text = "Points";
    }

    return [
      {
        icon: ICON,
        text: e,
        callback: cardButtonCallback
      }
    ];
  });
};

var cardButtonCallback = function(t) {
  var points = [NO_POINTS, 1, 2, 3, 4, 5].map(function(point) {
    return {
      text: point+' points',
      callback: function(t) {
          return t.set('card', 'private', 'points', point).then(function() {
              return t.closePopup();
          });
      }
    };
  });

  return t.popup({
    title: 'How many points?',
    items: points
  });
};

TrelloPowerUp.initialize({
  'card-badges': function(t, options) {
    return cardBadge(t);
  },
  'card-buttons': function(t, options) {
    return cardButton(t);
  }
});
