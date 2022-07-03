const AuthLogo: React.FC = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 239 145"
        fill="none"
        className="mx-auto h-16 w-auto"
      >
        <g id="Logo-Brand" filter="url(#filter0_d_1_13)">
          <g id="Group">
            <path
              id="Vector"
              d="M98.38 91.93V105.89L4 64.82V62.96L98.38 21.75V35.57L30.46 63.75L98.38 91.93Z"
              fill="#163455"
            />
            <path
              id="Vector_2"
              d="M140.5 35.71V21.75L234.88 62.82V64.68L140.5 105.89V92.07L208.42 63.89L140.5 35.71Z"
              fill="#1A3B6A"
            />
          </g>
          <path
            id="Vector_3"
            d="M56.06 56.06C56.06 25.1 81.16 0 112.12 0C143.08 0 168.18 25.1 168.18 56.06C168.18 87.02 112.12 136.5 112.12 136.5C112.12 136.5 56.06 87.02 56.06 56.06Z"
            fill="#25497D"
          />
          <path
            id="Vector_4"
            d="M112.12 0C143.08 0 168.18 25.1 168.18 56.06C168.18 87.02 112.12 136.5 112.12 136.5"
            fill="#163455"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1_13"
            x="0"
            y="0"
            width="238.88"
            height="144.5"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1_13"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1_13"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Ingrese a su cuenta
      </h2>
    </div>
  );
};

export default AuthLogo;
