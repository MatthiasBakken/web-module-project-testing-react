import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import Display from './../Display';
import fetchShow from '../../api/fetchShow';


jest.mock("../../api/fetchShow")

const testShow = {
    name: "Stranger Things",
    image: "https://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg",
    summary: "<p>A love letter to the '80s classics that captivated a generation, <b>Stranger Things</b> is set in 1983 Indiana, where a young boy vanishes into thin air.As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top- secret government experiments, terrifying supernatural forces and one very strange little girl.</p> ",
    seasons: [
        {
            id: 1,
            name: "Season 1",
            episodes: [
                {
                    id: 1,
                    name: "",
                    image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
                    season: 1,
                    number: 1,
                    summary: "This is the summary",
                    runtime: 1
                }
            ]
        }
    ]
};

test( 'render Display without errors', () => {
  render( <Display /> );
} );

test( 'show component will display when fetch button is pressed', async () => {
  fetchShow.mockResolvedValueOnce( {
    ...testShow
  } );
  const { getByText, getByTestId } = render( <Display /> );
  const fetchShowButton = getByText( /Press to Get Show Data/i );
  fireEvent.click( fetchShowButton );
  expect( fetchShow ).toHaveBeenCalledTimes( 1 );

  await waitFor( () => expect( getByTestId( /show-container/i ) ).toBeVisible() );
} );

test( 'check options are correct after button clicked & that optional func prop is fired', async () => {
  const getDataMock = jest.fn();
  fetchShow.mockResolvedValueOnce( {
    ...testShow
  } );
  const { getByText, getByTestId, getAllByTestId } = render( <Display displayFunc={getDataMock} /> );
  const fetchShowButton = getByText( /Press to Get Show Data/i );
  fireEvent.click( fetchShowButton );
  expect( fetchShow ).toHaveBeenCalledTimes( 2 );

  await waitFor( () => {
    expect( getByTestId( /show-container/i ) ).toBeVisible();
    expect( getAllByTestId( /season-option/i ) ).toHaveLength( 1 );
    expect( getDataMock ).toHaveBeenCalled();
  } );
} )

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.