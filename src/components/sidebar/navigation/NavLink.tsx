import React from 'react'
import { Link } from 'react-router-dom'
import { classNames } from '../../../helpers'
import NavLinkDataType from '../../../models/NavLinkDataType'

const NavLink: React.FC<{linkInfo: NavLinkDataType}> = ({linkInfo}) => {
  return (
    <Link key={linkInfo.key} to={linkInfo.href}>
            <span
              
              className={classNames(
                linkInfo.current
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
              aria-current={linkInfo.current ? "page" : undefined}
            >
                {/* @ts-ignore */}
              <linkInfo.icon
                className={classNames(
                    linkInfo.current
                    ? "text-gray-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "mr-3 flex-shrink-0 h-6 w-6"
                )}
                aria-hidden="true"
              />
              {linkInfo.key}
            </span>
          </Link>
  )
}

export default NavLink