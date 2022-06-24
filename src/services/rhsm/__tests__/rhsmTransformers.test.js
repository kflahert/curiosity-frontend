import { rhsmTransformers } from '../rhsmTransformers';
import { rhsmConstants, RHSM_API_RESPONSE_TALLY_DATA_TYPES as TALLY_DATA_TYPES } from '../rhsmConstants';

describe('RHSM Transformers', () => {
  it('should have specific response transformers', () => {
    expect(rhsmTransformers).toMatchSnapshot('specific transformers');
  });

  it('should attempt to parse an instances response', () => {
    expect(
      rhsmTransformers.instances({
        [rhsmConstants.RHSM_API_RESPONSE_DATA]: [
          {
            [rhsmConstants.RHSM_API_RESPONSE_INSTANCES_DATA_TYPES.MEASUREMENTS]: [1000, 0.0003456, 2]
          }
        ],
        [rhsmConstants.RHSM_API_RESPONSE_META]: {
          [rhsmConstants.RHSM_API_RESPONSE_INSTANCES_META_TYPES.MEASUREMENTS]: ['c', 'a', 'b']
        }
      })
    ).toMatchSnapshot('instances');
  });

  it('should attempt to parse a tally response', () => {
    const baseTallyResponse = {
      [rhsmConstants.RHSM_API_RESPONSE_DATA]: [],
      [rhsmConstants.RHSM_API_RESPONSE_META]: {}
    };

    expect(rhsmTransformers.tally(baseTallyResponse)).toMatchSnapshot('tally');

    const dailyTallyResponse = {
      [rhsmConstants.RHSM_API_RESPONSE_DATA]: [
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-14T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-15T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-16T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 1.4977989514668784,
          [TALLY_DATA_TYPES.HAS_DATA]: true
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-17T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 1.5547887908087836,
          [TALLY_DATA_TYPES.HAS_DATA]: true
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-18T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 4.446975872251722,
          [TALLY_DATA_TYPES.HAS_DATA]: true
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-19T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 4.69084013303121,
          [TALLY_DATA_TYPES.HAS_DATA]: true
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-20T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-21T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-22T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-23T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-24T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-25T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        }
      ],
      [rhsmConstants.RHSM_API_RESPONSE_META]: {}
    };

    expect(rhsmTransformers.tally(dailyTallyResponse)).toMatchSnapshot('tally, daily like granularity');

    const monthlyTallyResponse = {
      [rhsmConstants.RHSM_API_RESPONSE_DATA]: [
        {
          [TALLY_DATA_TYPES.DATE]: '2019-01-01T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-02-01T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-03-01T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-04-01T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-05-01T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 4.767144674723709,
          [TALLY_DATA_TYPES.HAS_DATA]: true
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-06-01T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 4.446975872251722,
          [TALLY_DATA_TYPES.HAS_DATA]: true
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-07-01T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        },
        {
          [TALLY_DATA_TYPES.DATE]: '2019-08-01T00:00:00Z',
          [TALLY_DATA_TYPES.VALUE]: 0.0,
          [TALLY_DATA_TYPES.HAS_DATA]: false
        }
      ],
      [rhsmConstants.RHSM_API_RESPONSE_META]: {}
    };

    expect(rhsmTransformers.tally(monthlyTallyResponse)).toMatchSnapshot('tally, monthly like granularity');
  });
});
