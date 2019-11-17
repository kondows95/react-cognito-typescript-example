import React from 'react';
import SubmitButton from '../SubmitButton';
import '@testing-library/jest-dom/extend-expect';
import TestUtil from '../../../TestUtil'; 
let util: TestUtil;

describe("Enable button",()=>{
  beforeEach(() => {
    util= new TestUtil(
      <SubmitButton　disabled={false} data-testid="submitButton">
        enable button
      </SubmitButton>
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });

  it ('button is enabled', () => {
    const elem = util.get("submitButton") as HTMLButtonElement;
    expect(elem.disabled).toBe(false);
  });

  it ('children displayed', () => {
    expect(util.render.container).toHaveTextContent('enable button'); 
  });
});

describe("Dispable button",()=>{
  beforeEach(() => {
    util= new TestUtil(
      <SubmitButton　disabled={true} data-testid="submitButton">
        disable button
      </SubmitButton>
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });

  it ('button is disabled', () => {
    const elem = util.get("submitButton") as HTMLButtonElement;
    expect(elem.disabled).toBe(true);
  });

  it ('children displayed', () => {
    expect(util.render.container).toHaveTextContent('disable button'); 
  });
});

describe("No children",()=>{
  beforeEach(() => {
    util= new TestUtil(
      <SubmitButton　disabled={true} data-testid="submitButton" />
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });

  it ('label is Submit', () => {
    expect(util.render.container).toHaveTextContent('Submit'); 
  })
});

