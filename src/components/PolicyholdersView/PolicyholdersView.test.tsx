import PolicyholdersView from './PolicyholdersView';
import { renderWithProviders } from '../../utils/test';

describe('PolicyholdersView', () => {

  it('should render a "Add a policyholder" button', () => {
    const { getByText } = renderWithProviders(<PolicyholdersView />);
    expect(getByText('Add a policyholder')).toBeInTheDocument();
  });
});
