import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Div, Flex } from 'honorable'
import { FiltersIcon, Tab } from 'pluralsh-design-system'
import { useTabListState } from '@react-stately/tabs'

import { Item, TabList } from '../_temp/TabList.tsx'

import MarketplaceSidebar from './MarketplaceSidebar'
import MarketplaceRepositories from './MarketplaceRepositories'

const sidebarWidth = 256 - 32

function Marketplace({ installed }) {
  const [areFiltersOpen, setAreFiltersOpen] = useState(true)
  const nextTabKey = installed ? 'marketplace' : 'installed'

  return (
    <Flex
      direction="column"
      overflow="hidden"
      flexGrow={1}
      maxWidth="100%"
    >
      <TabList
        selectedKey={nextTabKey}
        onSelectionChange={key => {
          console.log('stuff', key)
        }}
        renderer={(props, ref) => (
          <Flex
            className="the thing"
            {...props}
            ref={ref}
            marginHorizontal="large"
            flexShrink={0}
            direction="row"
            height={57}
            alignItems="flex-end"
          />
        )}
      >
        <Item
          key="marketplace"
          renderer={(props, ref) => (
            <Link
              ref={ref}
              to="/marketplace"
              style={{ color: 'inherit', textDecoration: 'none' }}
              {...props}
            >
              <Tab active={!installed}>Marketplace</Tab>
            </Link>
          )}
        />
        <Item
          key="installed"
          renderer={(props, ref) => (
            <Link
              ref={ref}
              to="/installed"
              style={{ color: 'inherit', textDecoration: 'none' }}
              {...props}
            >
              <Tab active={installed}>Installed</Tab>
            </Link>
          )}
        />
      </TabList>
      <Flex
        marginTop="medium"
        flexGrow={1}
        overflow="hidden"
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
      </Flex>
    </Flex>
  )
}

export default Marketplace
