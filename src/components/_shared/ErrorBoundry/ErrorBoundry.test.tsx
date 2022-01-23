import Modal from 'components/_shared/Modal/Modal';

import { mount, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ErrorBoundary from './ErrorBoundry';

describe('<ErrorBoundary/>', () => {
  const Something = () => null;
  beforeEach(() => jest.clearAllMocks());

  describe('when renders', () => {
    const rendered = shallow(
      <ErrorBoundary>
        <Something />
      </ErrorBoundary>
    );
    it('should render without crashing', () => {
      expect(rendered).toHaveLength(1);
    });

    it('should render child components', () => {
      expect(rendered.find(Something)).toHaveLength(1);
    });
  });

  describe('when error modal shows', () => {
    const { location, history } = window;

    const rendered = mount(
      <ErrorBoundary>
        <Something />
      </ErrorBoundary>
    );

    beforeAll(() => {
      delete window.location;
      window.location = {
        ...location,
        reload: jest.fn(),
      };

      delete window.history;
      window.history = {
        ...history,
        back: jest.fn(),
      };
    });

    afterAll(() => {
      window.location = location;
      window.history = history;
      rendered.unmount();
    });

    it('should show error modal for errors', () => {
      rendered.setState({
        error: new Error('Some Error'),
        errorInfo: 'Some Error',
      });
      expect(rendered.find(Modal)).toHaveLength(1);
    });

    it('should have 2 buttons', () => {
      expect(rendered.find(Modal).props().actionButtons).toHaveLength(2);
    });

    it('should call location.reload on retry', () => {
      const retry = rendered.find(Modal).props().actionButtons[0];
      act(() => {
        retry.action();
      });
      expect(window.location.reload).toHaveBeenCalled();
    });

    it('should call history.back on go back', () => {
      const goback = rendered.find(Modal).props().actionButtons[1];
      act(() => {
        goback.action();
      });
      expect(window.history.back).toHaveBeenCalled();
    });

    it('should call location.reload on close', () => {
      const onClose = rendered.find(Modal).props().onClose;
      act(() => {
        onClose();
      });
      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  describe('when error occurs', () => {
    it('should catch error', async () => {
      ErrorBoundary.prototype.setState = jest.fn();
      const rendered = mount(
        <ErrorBoundary>
          <Something />
        </ErrorBoundary>
      );
      const child = rendered.find(Something);
      await act(async () => {
        await child.simulateError('Error');
        rendered.update();
      });
      expect(ErrorBoundary.prototype.setState).toHaveBeenCalled();
      rendered.unmount();
    });
  });
});
