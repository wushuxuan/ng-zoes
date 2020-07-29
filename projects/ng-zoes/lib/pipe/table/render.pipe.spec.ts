import { RenderPipe } from './render.pipe';

describe('RenderPipe', () => {
  it('create an instance', () => {
    const pipe = new RenderPipe(null);
    expect(pipe).toBeTruthy();
  });
});
