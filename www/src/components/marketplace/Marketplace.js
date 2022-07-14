import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Div, Flex } from 'honorable'
import { Tab } from 'pluralsh-design-system'

import {
  TabList,
  TabListItem,
  TabPanel,
  useTabListState,
} from '../_temp/TabList.tsx'

import MarketplaceSidebar from './MarketplaceSidebar'
import MarketplaceRepositories from './MarketplaceRepositories'

const sidebarWidth = 256 - 32

function Marketplace({ installed }) {
  const [areFiltersOpen] = useState(true)
  const nextTabKey = installed ? 'installed' : 'marketplace'
  const tabProps = {
    selectedKey: nextTabKey,
    keyboardActivation: 'manual',
    orientation: 'horizontal',
    onSelectionChange: key => {
      console.log('key changed to', key)
    },
    children: [
      <TabListItem
        key="marketplace"
        renderer={(props, ref, state) => (
          <Link
            to="/marketplace"
            style={{ color: 'inherit', textDecoration: 'none' }}
            ref={ref}
            {...props}
          >
            <Tab active={state.selectedKey === 'marketplace'}>Marketplace</Tab>
          </Link>
        )}
      />,
      <TabListItem
        key="installed"
        renderer={(props, ref, state) => (
          <Link
            ref={ref}
            to="/installed"
            style={{ color: 'inherit', textDecoration: 'none' }}
            {...props}
          >
            <Tab active={state.selectedKey === 'installed'}>Installed</Tab>
          </Link>
        )}
      />,
    ],
  }
  const tabState = useTabListState({ ...tabProps })

  return (
    <Flex
      direction="column"
      overflow="hidden"
      flexGrow={1}
      maxWidth="100%"
    >
      <TabList
        tabState={tabState}
        tabProps={tabProps}
        marginHorizontal="large"
        flexShrink={0}
        height={57}
      />
      <TabPanel
        tabState={tabState}
        tabProps={tabProps}
        renderer={(props, ref) => (
          <Flex
            ref={ref}
            {...props}
            marginTop="medium"
            flexGrow={1}
            overflow="hidden"
          />
        )}
      >
        <MarketplaceRepositories
          installed={installed}
          flexGrow={1}
        />
        <Div
          marginRight={areFiltersOpen ? 'medium' : `-${sidebarWidth}px`}
          transform={areFiltersOpen ? 'translateX(0)' : 'translateX(100%)'}
          opacity={areFiltersOpen ? 1 : 0}
          flexShrink={0}
          position="sticky"
          top={0}
          right={0}
          width={sidebarWidth}
          height="calc(100% - 16px)"
          overflowY="auto"
          border="1px solid border"
          backgroundColor="fill-one"
          borderRadius="large"
          transition="all 250ms ease"
          zIndex={9999}
        >
          <MarketplaceSidebar width="100%" />
        </Div>
      </TabPanel>
    </Flex>
  )
}

export default Marketplace
