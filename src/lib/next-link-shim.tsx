import * as React from "react";

type NextLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
  legacyBehavior?: boolean;
  children?: React.ReactNode;
};

const NextLinkShim = React.forwardRef<HTMLAnchorElement, NextLinkProps>(
  ({ prefetch: _p, scroll: _s, replace: _r, legacyBehavior: _l, ...rest }, ref) => {
    return <a ref={ref} {...rest} />;
  }
);
NextLinkShim.displayName = "NextLinkShim";

export default NextLinkShim;
