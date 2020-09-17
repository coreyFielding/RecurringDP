import styled from "vue-styled-components";

const CalendarContainer = styled.div``;

export const StyledHeader = styled.div`
    display: flex
    align-items: center
    justify-content: space-between
    height: 40px
    width: calc(100% - 10px)
    margin-top: 3px
`;

export const StyledBtn = styled.button`
  background: none
  cursor: pointer
  border: none
  
`;

export const StyledArrow = styled.img`
  height: 15px
  width: 15px
  border-radius: 50%
  padding: 2px
  background: grey

  &:hover {
    background: rgba(0, 102, 204, 0.075)
    cursor: pointer
  }
`;

export const StyledArrowLeft = StyledArrow.extend`
  transform: rotate(90deg)
  transition: all 150ms
`;

export const StyledArrowRight = StyledArrow.extend`
  transform: rotate(-90deg)
  transition: all 150ms
`;

export const StyledImg = styled.img`
  height: 10px
  width: 10px
`;

export const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledCalendar = styled.div``;

export const StyledDatepicker = styled.div`
  height: 250px
  min-width: 40%
  max-width: 40%
  border-radius: 3px
  overflow: hidden
  box-shadow: 0px 2px 10px rgba(darken(#333867, 25%), .3)
  z-index: 1000
  font-family: Arial
`;

const StyledGrid = styled.div`
  display: grid;
`;

export const StyledDateGrid = StyledGrid.extend`
  grid-template: repeat(7, auto) / repeat(7, auto);
`;

export const StyledMonthGrid = StyledGrid.extend`
  grid-template: repeat(7, auto) / repeat(4, auto);
`;

const StyledCell = styled.div`
  text-align: center
  align-self: center
  user-select: none
  min-width: 20px
  max-width: 20px
  padding: 0.6em 0.3em
  margin: 0.05rem
  font-size: 10px
  cursor: pointer
`;

export const StyledLabelCell = StyledCell.extend`
  color: grey;
`;

export const StyledDateCell = StyledCell.extend`
  color: #000
  font-size: 10px
  text-align: center
  border-radius: 50%
  outline: none
  transition: all .100s ease-out
  animation: fade 1s ease-in both
  
  &:hover {
    color: #FFF
    background: #3CB371
    cursor: pointer
  } 
`;

export const StyledMonthCell = StyledCell.extend`
  border-radius: 3px
  font-size: 14px
  min-width: 100%
  margin: 3px
`;
