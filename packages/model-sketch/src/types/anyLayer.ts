// eslint-disable-next-line max-classes-per-file
import { Group, Rectangle } from '../layers';

class GroupType extends Group {}

class RectangleType extends Rectangle {}

export type AnyLayer = GroupType | RectangleType;
