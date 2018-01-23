import React, { Component } from 'react';
import NavigationItem from './NavigationItem';
import Search from '../components/Search';

class VerticalNavigationList extends Component {
  constructor(...rest) {
    super(...rest);
    this.state = {
      hits: [],
    };
  }
  render() {
    const { currentSlug, edges, searchData } = this.props;
    const { hits } = this.state;
    console.log(hits);
    return (
      <div>
        <Search
          data={searchData}
          onSearch={hits =>
            this.setState({
              hits,
            })
          }
        />
        <nav>
          <dl>
            {edges
              .filter(
                ({ node }) =>
                  hits.length === 0 ||
                  hits.filter(hit => hit.id !== node.id).length > 0,
              )
              .map(({ node }, index) => (
                <div key={`nav-header-wrapper-${index}`}>
                  {node.headings
                    .filter(item => item.depth === 1)
                    .map((heading, index) => (
                      <NavigationItem
                        {...heading}
                        key={`nav-item-${node.fields.slug}`}
                        href={`${node.fields.slug}`}
                      />
                    ))}
                  {node.fields.slug === currentSlug &&
                    node.headings
                      .filter(item => item.depth > 1)
                      .map((heading, index) => (
                        <NavigationItem
                          {...heading}
                          key={`nav-sub-item-${index}`}
                          href={`${
                            node.fields.slug
                          }#${heading.value
                            .toLowerCase()
                            .replace(/[ ]/g, '-')}`}
                        />
                      ))}
                </div>
              ))}
          </dl>
        </nav>
      </div>
    );
  }
}

export default VerticalNavigationList;