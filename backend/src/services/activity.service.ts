import activityRepository from '../repositories/activity.repository';
import imageRepository from '../repositories/image.repository';
import { deleteActivityImageFile } from '../utils/activityImageStorage';
import { CreateActivityDTO, UpdateActivityDTO } from '../dtos/activity.dto';
import { Activity } from '../models/entity/activity.entity';
import { AvailableDate } from '../models/entity/availableDate.entity';
import { strategyMap } from '../patterns/strategy/strategy.mapper';

export class ActivityService {
  async getAll(): Promise<Activity[]> {
    return await activityRepository.getAll();
  }

  async getAllSorted(sortKey?: string): Promise<Activity[]> {
    const activities = await activityRepository.getAll();

    if (!sortKey) return activities;

    const StrategyClass = strategyMap[sortKey];
    if (!StrategyClass) return activities;

    const strategy = new StrategyClass();
    return strategy.sort(activities);
  }

  async getById(activity_id: number) {
    const activity = await activityRepository.getById(activity_id);
    if (!activity) throw new Error('Actividad no encontrada');
    return activity;
  }

  async create(data: CreateActivityDTO) {
    const { availableDates, ...activityData } = data;

    const createdActivity = await activityRepository.create(activityData);

    if (availableDates && availableDates.length > 0) {
      await AvailableDate.bulkCreate(
        availableDates.map((date) => ({
          start_date: date.start_date,
          end_date: date.end_date,
          activity_id: createdActivity.activity_id,
        })),
      );
    }

    return await activityRepository.getById(createdActivity.activity_id);
  }

  async update(activity_id: number, data: UpdateActivityDTO) {
    const { availableDates, ...activityData } = data;

    const updated = await activityRepository.update(activity_id, activityData);
    if (!updated) throw new Error('Actividad no encontrada');

    if (availableDates) {
      await AvailableDate.destroy({
        where: { activity_id },
      });

      if (availableDates.length > 0) {
        await AvailableDate.bulkCreate(
          availableDates.map((date) => ({
            start_date: date.start_date,
            end_date: date.end_date,
            activity_id,
          })),
        );
      }
    }

    return await activityRepository.getById(activity_id);
  }

  async delete(activity_id: number) {
    const activity = await activityRepository.getById(activity_id);

    if (!activity) {
      throw new Error('Actividad no encontrada');
    }

    const images = await imageRepository.getByActivityId(activity_id);

    for (const image of images) {
      await deleteActivityImageFile(image);
    }

    const deleted = await activityRepository.delete(activity_id);

    if (!deleted) {
      throw new Error('Actividad no encontrada');
    }

    return deleted;
  }
}

export default new ActivityService();
