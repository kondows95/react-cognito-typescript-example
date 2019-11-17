import {ReactElement} from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
export default class TestUtil
{
  public render: RenderResult;
  constructor(component:ReactElement) {
    this.render = render(component);
  }

  setValue(testId: string, value: string | number) {
    const elem = this.render.getByTestId(testId);
    fireEvent.change(elem, {target: {value: value}})
  }

  click(testId: string) {
    const elem = this.render.getByTestId(testId);
    fireEvent.click(elem);
  }

  getAll(testId: string) {
    return this.render.getAllByTestId(testId);
  }

  get(testId: string) {
    return this.render.getByTestId(testId);
  }
}