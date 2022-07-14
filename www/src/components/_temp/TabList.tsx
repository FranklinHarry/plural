import { Div, DivProps, Flex, FlexProps, H1, Li } from "honorable";
import { Item } from "@react-stately/collections";
import { useTab, useTabList, useTabPanel } from "@react-aria/tabs";
import { useTabListState } from "@react-stately/tabs";
import { TabListState } from "@react-stately/tabs";
import { Tab } from "pluralsh-design-system";
import { ItemProps, Node } from "@react-types/shared";

import { HTMLAttributes, RefObject, useRef } from "react";

type Renderer = (
  props: HTMLAttributes<HTMLElement>,
  ref: RefObject<any>,
  state: TabListState<any>
) => JSX.Element;

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;

type TabListItemProps = MakeOptional<ItemProps<void>, "children"> & {
  renderer?: Renderer;
};

const TabListItem = Item as (props: TabListItemProps) => JSX.Element;

type TabListProps = {
  tabState: TabListState<object>;
  tabProps: any;
  renderer?: Renderer;
};

export const TabList = ({
  tabState,
  tabProps,
  renderer,
  ...props
}: TabListProps & FlexProps) => {
  tabProps = {
    ...{
      keyboardActivation: "manual",
      orientation: "horizontal",
    },
    ...tabProps,
  };
  const ref = useRef<HTMLDivElement>(null);
  const { tabListProps } = useTabList(tabProps, tabState, ref);
  const tabChildren = [...tabState.collection].map((item) => {
    return (
      <TabRenderer key={item.key} item={item as any} tabState={tabState} />
    );
  });
  if (renderer) {
    return renderer(
      { ...tabListProps, ...{ children: tabChildren } },
      ref,
      tabState
    );
  }
  return (
    <Flex
      {...tabListProps}
      {...props}
      flexDirection={tabProps.orientation === "vertical" ? "column" : "row"}
      alignItems={
        tabProps.orientation === "vertical" ? "flex-start" : "flex-end"
      }
      ref={ref}
    >
      {tabChildren}
    </Flex>
  );
};

const TabRenderer = ({
  item,
  tabState,
}: {
  item: Node<typeof TabListItem>;
  tabState: TabListState<any>;
}) => {
  let ref = useRef<HTMLDivElement>(null);
  let { tabProps } = useTab({ key: item.key }, tabState, ref);
  if (item.props.renderer) {
    return item.props.renderer(tabProps, ref, tabState);
  }
  return (
    <Tab ref={ref} {...tabProps} active={tabState.selectedKey === item.key}>
      {item.rendered}
    </Tab>
  );
};

export type TabPanelProps = {
  tabState: TabListState<object>;
  tabProps: any;
  renderer?: Renderer;
};
export const TabPanel = ({
  tabState,
  tabProps,
  renderer,
  ...props
}: TabPanelProps & DivProps) => {
  let ref = useRef<any>();
  let { tabPanelProps } = useTabPanel(tabProps, tabState, ref);
  if (renderer) {
    return renderer({ ...tabPanelProps, ...props }, ref, tabState);
  }
  return <Div {...tabPanelProps} {...props} ref={ref}></Div>;
};

export const TabListTest = () => {
  const tabListProps = {
    keyboardActivation: "manual",
    orientation: "horizontal",
    children: [
      <TabListItem key="1">Stuff 1</TabListItem>,
      <TabListItem key="2">
        <Div>Stuff 2</Div>
      </TabListItem>,
      <TabListItem
        key="3"
        renderer={(props, ref) => {
          return (
            <Li {...props} ref={ref}>
              List item content
            </Li>
          );
        }}
      />,
    ],
  };

  const tabState = useTabListState(tabListProps);

  return (
    <Div>
      <TabList tabState={tabState} tabProps={tabListProps}></TabList>
      <H1 heading>Tab Content</H1>
      <TabPanel
        tabState={tabState}
        tabProps={tabListProps}
        renderer={(props, ref) => {
          return <Div>Render Prop Content</Div>;
        }}
      >
        {`Panel Content ${tabState.selectedKey}`}
      </TabPanel>
    </Div>
  );
};

export { useTabListState, TabListItem };
