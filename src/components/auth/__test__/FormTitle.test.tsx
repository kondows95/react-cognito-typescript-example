import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import FormTitle from '../FormTitle';
import TestUtil from '../../../TestUtil'; 

describe("FormTitle Component",()=>{
  let util: TestUtil;
  beforeEach(() => {
    util= new TestUtil(
      <FormTitle children={"Form Title"}/>
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });

  it('Check text', () => {
    expect(util.render.container).toHaveTextContent('Form Title'); 
  });
});