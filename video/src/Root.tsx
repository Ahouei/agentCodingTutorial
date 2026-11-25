import { Composition } from 'remotion';
import { Trailer } from './Trailer';
import { TrailerV2 } from './TrailerV2';

export const Root = () => (
  <>
    <Composition id="Trailer" component={Trailer} durationInFrames={600} fps={30} width={1080} height={1080} />
    {/* Trailer v2: one film, two languages, two shapes. */}
    <Composition id="TrailerFaSquare" component={TrailerV2} defaultProps={{ lang: 'fa' as const }} durationInFrames={600} fps={30} width={1080} height={1080} />
    <Composition id="TrailerFaVertical" component={TrailerV2} defaultProps={{ lang: 'fa' as const }} durationInFrames={600} fps={30} width={1080} height={1920} />
    <Composition id="TrailerEnSquare" component={TrailerV2} defaultProps={{ lang: 'en' as const }} durationInFrames={600} fps={30} width={1080} height={1080} />
    <Composition id="TrailerEnVertical" component={TrailerV2} defaultProps={{ lang: 'en' as const }} durationInFrames={600} fps={30} width={1080} height={1920} />
  </>
);
