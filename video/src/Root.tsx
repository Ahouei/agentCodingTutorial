import { Composition } from 'remotion';
import { Trailer } from './Trailer';

export const Root = () => (
  <Composition id="Trailer" component={Trailer} durationInFrames={600} fps={30} width={1080} height={1080} />
);
