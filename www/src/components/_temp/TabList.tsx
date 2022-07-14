import { Div, DivProps } from "honorable";
import { Item } from "@react-stately/collections";
import { useTab, useTabList, useTabPanel } from "@react-aria/tabs";
import { useTabListState } from "@react-stately/tabs";
import { TabListState } from "@react-stately/tabs";
import { Tab } from "pluralsh-design-system";
import {
  ItemRenderer,
  ItemProps,
  SectionProps,
  Collection,
  CollectionBase,
  Node,
} from "@react-types/shared";

import {
  AriaTabProps,
  AriaTabPanelProps,
  AriaTabListProps,
} from "@react-types/tabs";

import { forwardRef, HTMLAttributes, RefObject, useRef } from "react";

type Renderer = (
  props: HTMLAttributes<HTMLElement>,
  ref: RefObject<any>
) => JSX.Element;

const TabListItem = (props: ItemProps<void> & { renderer?: Renderer }) => (
  <Item {...props} />
);
export { TabListItem };

const x = (
  <TabListItem
    key="blarg"
    renderer={(props, ref) => (
      <Div {...props} ref={ref}>
        stiff
      </Div>
    )}
  >
    child
  </TabListItem>
);

export type TabListProps = { renderer: Renderer } & AriaTabListProps<
  typeof TabListItem
>;

export const TabList = ({ renderer, ...props }: TabListProps) => {
  props = {
    ...{
      keyboardActivation: "manual",
      orientation: "horizontal",
    },
    ...props,
  };
  const ref = useRef<HTMLDivElement>(null);
  const state = useTabListState(props);
  const { tabListProps } = useTabList(props, state, ref);
  const tabChildren = [...state.collection].map((item) => {
    return <TabRenderer key={item.key} item={item} state={state} />;
  });
  if (renderer) {
    return renderer({ ...tabListProps, ...{ children: tabChildren } }, ref);
  }
  return (
    <Div {...tabListProps} ref={ref}>
      {tabChildren}
    </Div>
  );
};

const TabRenderer = ({
  item,
  state,
}: {
  item: Node<typeof TabListItem>;
  state: TabListState<any>;
}) => {
  let ref = useRef<HTMLDivElement>(null);
  let { tabProps } = useTab({ key: item.key }, state, ref);
  if (item.props.renderer) {
    return item.props.renderer(tabProps, ref);
  }
  return (
    <Tab {...tabProps} ref={ref}>
      {item.rendered}
    </Tab>
  );
};

export { useTabListState, Item };
