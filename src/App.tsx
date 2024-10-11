import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((a: string, b: string) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a: string, b: string) => a.length - b.length);
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const resetSorting = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const sortByMethod = (sortingType: SortType) => {
    setSortType(sortingType);
  };

  const reverseHanlder = () => {
    setIsReversed(!isReversed);
  };

  const reorderedGoods = getReorderedGoods(goodsFromServer, {
    sortType: sortType,
    isReversed: isReversed,
  });

  const displayResetButton = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${SortType.ALPHABET !== sortType ? ' is-light' : ''}`}
          onClick={() => sortByMethod(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${SortType.LENGTH !== sortType ? ' is-light' : ''}`}
          onClick={() => sortByMethod(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${isReversed === false ? ' is-light' : ''}`}
          onClick={reverseHanlder}
        >
          Reverse
        </button>

        {displayResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {reorderedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
