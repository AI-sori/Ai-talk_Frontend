import styled from "styled-components";
import { Color } from "../../constants/colors";

export const Outer = styled.div`
  width: 100vw;
  min-height: 100dvh;
  background: ${Color.bgApp};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 400px;
  flex: 1;
  background: ${Color.bgCanvas};   /* ← 기존 surface 대신 bgCanvas 사용 */
  padding: 1.5rem;
  box-sizing: border-box;
`;

export const Card = styled.div`
  background: #ffffff;             /* ← surface 토큰 없음: 고정 white */
  border-radius: 20px;
  color: ${Color.text};
  padding: 1.5rem;
  font-family: SemiBold;
  font-size: 17px;
  margin: 0.9rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
`;

export const MapControl = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
`;

export const ControlButton = styled.button`
  background-color: ${Color.primary};
  color: ${Color.onPrimary};
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: ${Color.primaryHover};
  }
`;

export const MapCanvas = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

export const ProgramCarousel = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.5rem;
`;

export const ProgramCard = styled.div`
  flex: 0 0 auto;
  width: 240px;
  scroll-snap-align: start;
  background: ${Color.cardBg};
  border-radius: 12px;
  overflow: hidden;
`;

export const ProgramVideo = styled.iframe`
  width: 100%;
  height: 140px;
  border: none;
`;

export const ProgramMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 13px;
  font-weight: 500;
  color: #777;
  padding: 0.8rem 1rem 0 1rem;

  .type {
    color: ${Color.anonAccent};
  }
`;

export const ProgramTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding: 0.3rem 1rem 0 1rem;
`;

export const ProgramDesc = styled.div`
  font-size: 13px;
  color: ${Color.textSecondary};
  padding: 0.3rem 1rem 1rem 1rem;
`;

export const GraphRoot = styled.div`
  width: 100%;
  height: 200px;
`;

export const GraphInner = styled.div`
  width: 100%;
  height: 160px;
  margin-left: -30px;
`;

export const GraphLegend = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 6px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px;
  font-size: 12px;
`;

export const LegendDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
`;

export const HelperText = styled.p`
  font-size: 12px;
  color: ${Color.textSecondary};
  margin: 0.25rem 0 0.75rem;
`;
