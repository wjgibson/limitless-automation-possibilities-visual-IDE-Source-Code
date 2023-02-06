import DropDownMenu from '../../src/Elements/dropDownMenu';

describe('dropDownMenu.cy.js', () => {
  it('dropDownMenu mounts correctly', () => {
    cy.mount(<DropDownMenu />);
  });
});
